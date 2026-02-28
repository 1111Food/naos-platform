import { supabase } from '../../lib/supabase';

import { FastifyRequest, FastifyReply } from 'fastify';
import { SynastryOracle } from './SynastryOracle';
import { SynastryEngine } from './SynastryEngine';
import { TemporalEngine } from './TemporalEngine';
import { generateSynastryHash } from '../../utils/hashCombiner';
import { RelationshipType, SynastryProfile } from '../../types/synastry';
import { AstrologyService } from '../astrology/astroService';
import { NumerologyService } from '../numerology/service';
import { MayanCalculator } from '../../utils/mayaCalculator';
import { ChineseAstrology } from '../../utils/chineseAstrology';

export class SynastryController {
    public static async analyze(request: FastifyRequest, reply: FastifyReply) {
        const userId = (request as any).user_id;
        try {
            const { userProfile, partnerData, relationshipType } = request.body as any;
            const type = relationshipType || RelationshipType.ROMANTIC;

            console.log(`🔮 Synastry Inversion: ${userProfile?.id} <-> ${partnerData?.name} (${type})`);

            if (!userProfile?.birthDate || !partnerData?.birthDate) {
                return reply.status(400).send({ error: "Fechas requeridas.", message: "Missing birth dates for synchronization." });
            }

            // Backend Geocoding Restoration
            if ((!partnerData.coordinates || !partnerData.coordinates.lat) && partnerData.birthCity) {
                try {
                    console.log(`🌍 Backend Geocoding for: ${partnerData.birthCity}, ${partnerData.birthCountry}`);
                    const query = encodeURIComponent(`${partnerData.birthCity}, ${partnerData.birthCountry}`);
                    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`, {
                        headers: { 'User-Agent': 'NAOS-Platform/1.0' }
                    });
                    if (geoRes.ok) {
                        const geoData = await geoRes.json();
                        if (geoData && geoData.length > 0) {
                            partnerData.coordinates = {
                                lat: parseFloat(geoData[0].lat),
                                lng: parseFloat(geoData[0].lon)
                            };
                            partnerData.utcOffset = Math.round(partnerData.coordinates.lng / 15);
                            console.log(`📍 Found: ${partnerData.coordinates.lat}, ${partnerData.coordinates.lng} (Offset: ${partnerData.utcOffset})`);
                        }
                    }
                } catch (e) {
                    console.warn("⚠️ Backend Geocoding failed, using fallback", e);
                }
            }

            // Ensure fallbacks
            if (!partnerData.coordinates) {
                partnerData.coordinates = { lat: 14.6349, lng: -90.5069 };
                partnerData.utcOffset = -6;
            }

            const hash = generateSynastryHash(userProfile.birthDate, partnerData.birthDate);

            // 1. LIMIT CHECK - Max 5 entries per user
            const { count, error: countError } = await supabase
                .from('synastry_history')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            if (countError) throw countError;

            // Check cache FIRST - if it exists, we don't count it as a "new" entry against the limit
            const { data: cached } = await supabase.from('synastry_history')
                .select('*')
                .eq('user_id', userId)
                .eq('combination_hash', hash)
                .eq('relationship_type', type)
                .single();

            if (cached) {
                console.log("⚡ Cache Hit: Returning existing resonance.");
                return reply.send({ success: true, cached: true, data: cached.calculated_results });
            }

            // If not cached and already at limit, block calculation
            if (count && count >= 5) {
                return reply.status(403).send({
                    error: "Límite Alcanzado",
                    message: "Tu historial astral está saturado (Máx. 5). Debes liberar un registro akáshico para invocar uno nuevo."
                });
            }

            console.log("🧬 Calculating new resonance...");
            const pillarsB = await SynastryController.calculatePillarsB(partnerData);
            const report = SynastryEngine.calculate(userProfile, pillarsB, type);
            const timeWindows = TemporalEngine.project(userProfile, pillarsB);

            // Generate Premium AI Narration
            console.log("🤖 Invoking Oracle Synthesis...");
            const synthesis = await SynastryOracle.generateSynthesis(report, timeWindows, type);

            const finalResult = {
                report,
                timeWindows,
                synthesis,
                partnerInfo: {
                    name: partnerData.name,
                    birthCity: partnerData.birthCity,
                    birthCountry: partnerData.birthCountry,
                    pillars: pillarsB
                },
                metadata: { hash, type, calculatedAt: new Date().toISOString() }
            };

            if (userId && userId !== '00000000-0000-0000-0000-000000000000') {
                const { error: insertError } = await supabase.from('synastry_history').insert({
                    user_id: userId,
                    partner_name: partnerData.name,
                    partner_birth_date: partnerData.birthDate,
                    relationship_type: type,
                    combination_hash: hash,
                    calculated_results: finalResult
                });
                if (insertError) console.error("❌ History Insertion Error:", insertError);
            }

            return reply.send({ success: true, cached: false, data: finalResult });
        } catch (error: any) {
            console.error("❌ Synastry Analysis Critical Failure:", error);
            return reply.status(500).send({ error: "System failure.", message: error.message });
        }
    }

    private static async calculatePillarsB(data: SynastryProfile) {
        const astro = await AstrologyService.calculateProfile(
            data.birthDate,
            data.birthTime || "12:00",
            data.coordinates?.lat || 14.6349,
            data.coordinates?.lng || -90.5069,
            data.utcOffset || -6
        );
        const num = NumerologyService.calculateProfile(data.birthDate, data.name);
        const maya = MayanCalculator.calculate(data.birthDate);
        const chinese = ChineseAstrology.calculate(data.birthDate);

        return {
            astrology: astro,
            numerology: num,
            mayan: { nawal: maya.nawal_maya, tone: maya.nawal_tono },
            chinese: { animal: chinese.animal, element: chinese.element }
        };
    }
    public static async getHistory(request: FastifyRequest, reply: FastifyReply) {
        const userId = (request as any).user_id;
        const { data, error } = await supabase.from('synastry_history').select('*').eq('user_id', userId).order('created_at', { ascending: false });
        if (error) return reply.status(500).send({ error: "Failed to fetch history." });
        return reply.send(data);
    }

    public static async deleteHistory(request: FastifyRequest, reply: FastifyReply) {
        const userId = (request as any).user_id;
        let { id } = request.params as { id: string };

        // Sanitización: Si por alguna razón llega con el prefijo r_ detectado en logs, lo limpiamos
        if (id.startsWith('r_')) {
            id = id.substring(2);
        }

        console.log(`🗑️ Deleting Synastry Record: ${id} (Original was prefixed: ${id !== (request.params as any).id}) for User: ${userId}`);

        const { error } = await supabase
            .from('synastry_history')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

        if (error) {
            console.error("❌ Deletion Error:", error);
            return reply.status(500).send({ error: "No se pudo borrar el registro." });
        }

        return reply.send({ success: true, message: "Registro liberado." });
    }
}
