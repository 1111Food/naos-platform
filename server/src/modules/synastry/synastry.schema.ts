export const analyzeSchema = {
    body: {
        type: 'object',
        required: ['userProfile', 'partnerData'],
        properties: {
            userProfile: { type: 'object' },
            partnerData: {
                type: 'object',
                required: ['name', 'birthDate'],
                properties: {
                    name: { type: 'string' },
                    birthDate: { type: 'string' },
                    birthTime: { type: 'string' },
                    birthCity: { type: 'string' },
                    birthCountry: { type: 'string' },
                    coordinates: { type: 'object', properties: { lat: { type: 'number' }, lng: { type: 'number' } } },
                    utcOffset: { type: 'number' }
                }
            },
            relationshipType: { type: 'string', enum: ['ROMANTIC', 'BUSINESS', 'PARENTAL', 'FRATERNAL'] }
        }
    }
};
export const historySchema = { querystring: { type: 'object', properties: {} } };

export const deleteHistorySchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    }
};
