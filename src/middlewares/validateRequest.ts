import { Handler } from 'express';
import httpStatus from 'http-status';
import { z } from 'zod';

export const validate =
    (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject> | z.ZodEffects<z.AnyZodObject>): Handler =>
    async (req, res, next) => {
        try {
            const { body, query, params } = req;
            await schema.parseAsync({
                body,
                query,
                params,
            });
            next();
        } catch (error) {
            let err = error;
            if (error instanceof z.ZodError) {
                err = err.issues.map((e: any) => ({ path: e.path[0], message: e.message }));
            }

            return res.status(httpStatus.BAD_REQUEST).json({
                code: httpStatus.BAD_REQUEST,
                status: 'failed',
                error: err,
            });
        }
    };
