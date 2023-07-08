import { z } from 'zod';

//basic color schema
export const colorSchema = z.object({
    r: z.number().int().min(0).max(255),
    g: z.number().int().min(0).max(255),
    b: z.number().int().min(0).max(255),
});

export type ColorType = z.infer<typeof colorSchema>;

//color array schema (row/width)
export const colorArraySchema = z.array(colorSchema);

export type ColorArrayType = z.infer<typeof colorArraySchema>;

//color array array schema (grid: row(width) * col(height))
export const colorArrayArraySchema = z.array(colorArraySchema);

export type ColorArrayArrayType = z.infer<typeof colorArrayArraySchema>;

export const tileSchema = z.object({
    x: z.number().int().min(0).max(21),
    y: z.number().int().min(0).max(11),
    color: colorSchema,
    isSource: z.boolean().optional(),
});

export type TileType = z.infer<typeof tileSchema>;

export const fetchDataSchema = z.object({
    userId: z.string(),
    width: z.number().int().min(10).max(20),
    height: z.number().int().min(4).max(10),
    maxMoves: z.number().int().min(8).max(20),
    target: colorSchema,
});

export type FetchDataType = z.infer<typeof fetchDataSchema>;

export const gameDataSchema = z.object({
    moved: z.number().int().min(0).max(20),
    closest: tileSchema,
    delta: z.number().min(0).max(100), //percentage, round to 2 dp
    tiles: z.array(tileSchema),
    isEndGame: z.boolean(),
});

export type GameDataType = z.infer<typeof gameDataSchema>;

//router
export type PageType = 'home' | 'game' | 'instruction';