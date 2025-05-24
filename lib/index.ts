//-- NPM Packages
import * as core from '@actions/core';

/**
 * An enumeration representing the possible stages of a GitHub Action.
 */
export const GitHubActionStageEnum = {
    /**
     * The stage before the main run stage of the action.
     */
    PreRun: 'pre-run',

    /**
     * The main run stage of the action.
     */
    Run: 'run',

    /**
     * The stage after the main run stage of the action.
     */
    PostRun: 'post-run'
} as const;

/**
 * A type union representing the possible stages of a GitHub Action.
 */
export type GitHubActionStage =
    (typeof GitHubActionStageEnum)[keyof typeof GitHubActionStageEnum];

/**
 * Check whether a value is `null`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `null`, `false` otherwise.
 */
export const isNull = (value: unknown): value is null => {
    return value === null;
};

/**
 * Check whether a value is `undefined`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `undefined`, `false` otherwise.
 */
export const isUndefined = (value: unknown): value is undefined => {
    return value === undefined;
};

/**
 * Check whether a value is `null` or `undefined`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `null` or `undefined`, `false` otherwise.
 */
export const isNullOrUndefined = (
    value: unknown
): value is null | undefined => {
    return isNull(value) || isUndefined(value);
};

/**
 * Check whether a value is a string.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a string, `false` otherwise.
 */
export const isString = (value: unknown): value is string => {
    return typeof value === 'string';
};

/**
 * Check whether a value is an empty string.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is an empty string, `false` otherwise.
 */
export const isEmptyString = (value: unknown): boolean => {
    return isString(value) && value === '';
};

/**
 * Check whether a value is a string that is empty or composed only of whitespace.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a string composed only of whitespace, `false`
 * otherwise.
 */
export const isEmptyOrWhitespaceString = (value: unknown): boolean => {
    return isString(value) && value.trim().length === 0;
};

/**
 * Check whether a value is `null` or a string and empty or composed only of
 * whitespace.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `null` or a string and empty or composed only
 * of whitespace, `false` otherwise.
 */
export const isNullOrStringAndEmptyOrWhitespace = (value: unknown): boolean => {
    return isNull(value) || (isString(value) && value.trim().length === 0);
};

/**
 * Check whether a value is `undefined` or a string and empty or composed only of
 * whitespace.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `undefined` or a string and empty or composed only
 * of whitespace, `false` otherwise.
 */
export const isUndefinedOrStringAndEmptyOrWhitespace = (
    value: unknown
): boolean => {
    return isUndefined(value) || (isString(value) && value.trim().length === 0);
};

/**
 * Check whether a value is `null` or `undefined` or a string and empty or composed only of
 * whitespace.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `null` or `undefined` or a string and empty
 * or composed only of whitespace, `false` otherwise.
 */
export const isNullOrUndefinedOrStringAndEmptyOrWhitespace = (
    value: unknown
): boolean => {
    return (
        isNullOrUndefined(value) ||
        (isString(value) && value.trim().length === 0)
    );
};

/**
 * Check whether a value is a number.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a number, `false` otherwise.
 */
export const isNumber = (value: unknown): value is number => {
    return typeof value === 'number';
};

/**
 * Check whether a value is a number and finite.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a number and finite, `false` otherwise.
 */
export const isNumberAndFinite = (value: unknown): value is number => {
    return typeof value === 'number' && isFinite(value);
};

/**
 * Check whether a value is a boolean.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a boolean, `false` otherwise.
 */
export const isBoolean = (value: unknown): value is boolean => {
    return typeof value === 'boolean';
};

/**
 * Get the current stage of the GitHub Action.
 *
 * @returns The current stage of the GitHub Action.
 */
export const getGitHubActionStage = (): GitHubActionStage => {
    const previousStage = core.getState('previous-stage');
    if (isNullOrUndefinedOrStringAndEmptyOrWhitespace(previousStage)) {
        return GitHubActionStageEnum.PreRun;
    }
    switch (previousStage) {
        case GitHubActionStageEnum.PreRun:
            return GitHubActionStageEnum.Run;
        case GitHubActionStageEnum.Run:
            return GitHubActionStageEnum.PostRun;
        default:
            throw new Error(
                `Invalid previous GitHub Actions stage "${previousStage}"`
            );
    }
};
