import * as Joi from '@hapi/joi';

export const configurationsValidator = Joi.object({
  SUPABASE_API_KEY: Joi.string().required(),
  SUPABASE_API_URL: Joi.string().required(),
});

export const configurations = () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  supabase: {
    url: process.env.SUPABASE_API_URL,
    anonApiKey: process.env.SUPABASE_API_KEY,
  },
});
