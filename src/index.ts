//-- NPM Packages
import * as core from '@actions/core';
import * as github from '@actions/github';

//-- Project Code
import {getGitHubActionStage, GitHubActionStageEnum} from '@lib';
import * as project from '../package.json';

/**
 * Run the pre-run stage of the GitHub Action.
 *
 * @returns A promise that resolves when the pre-run stage is complete or
 * rejects if an error occurs.
 */
const preRun = async (): Promise<void> => {};

/**
 * Run the main run stage of the GitHub Action.
 *
 * @returns A promise that resolves when the run stage is complete or
 * rejects if an error occurs.
 */
const run = async (): Promise<void> => {};

/**
 * Run the post-run stage of the GitHub Action.
 *
 * @returns A promise that resolves when the post-run stage is complete or
 * rejects if an error occurs.
 */
const postRun = async (): Promise<void> => {};

/**
 * The stage the GitHub Action is running in.
 */
const actionStage = getGitHubActionStage();

/**
 * The main function that runs the GitHub Action.
 *
 * @returns A promise that resolves when the action is complete or rejects if
 * an error occurs.
 */
const main = async (): Promise<void> => {
    core.info(
        `Starting stage "${actionStage}" for GitHub Action "${project.name}"...`
    );
    switch (actionStage) {
        case GitHubActionStageEnum.PreRun:
            await preRun();
            break;
        case GitHubActionStageEnum.Run:
            await run();
            break;
        case GitHubActionStageEnum.PostRun:
            await postRun();
            break;
        default:
            throw new Error(`Unknown action stage "${actionStage}"`);
    }
};

main()
    .then(() => {
        core.info(
            `Stage "${actionStage}" for GitHub Action "${project.name}" completed successfully`
        );
    })
    .catch((error: Error) => {
        core.error(error, {
            title: `Stage "${actionStage}" for GitHub Action "${project.name}" failed due to a fatal error`
        });
        core.setFailed(error);
    });
