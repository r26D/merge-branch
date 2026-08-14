const core = require('@actions/core');
const github = require('@actions/github');
const { validateInputs, isLabeledValid } = require('./merge-branch-service');

async function run() {
  const type = core.getInput('type') || 'labeled';
  const labelName = core.getInput('label_name');
  const targetBranch = core.getInput('target_branch');
  const headToMerge = core.getInput('head_to_merge') || core.getInput('from_branch') || github.context.sha;
  const token = core.getInput('github_token');
  const message = core.getInput('message');
  const disableFastforwards = core.getInput('disable_fastforwards');

  validateInputs({ type, targetBranch, labelName });

  const repo = github.context.repo;
  const event = github.context.payload;

  if (type === 'labeled' && !isLabeledValid(event, labelName)) {
    core.info(`Neutral: skip merge target_branch: ${targetBranch} head_to_merge: ${headToMerge}`);
    return;
  }

  const octokit = github.getOctokit(token);

  const { data: comparison } = await octokit.rest.repos.compareCommits({
    ...repo,
    base: targetBranch,
    head: headToMerge,
  });

  if (comparison.status === 'identical' && disableFastforwards === 'true') {
    core.info(`Neutral: skip fastforward merge target_branch: ${targetBranch} head_to_merge: ${headToMerge}`);
    return;
  }

  core.info(`Running perform merge target_branch: ${targetBranch} head_to_merge: ${headToMerge}`);

  const mergeOptions = { ...repo, base: targetBranch, head: headToMerge };
  if (message) {
    mergeOptions.commit_message = message;
  }

  await octokit.rest.repos.merge(mergeOptions);

  core.info(`Completed: Finish merge branch ${headToMerge} to ${targetBranch}`);
}

run().catch((error) => {
  core.setFailed(error.message);
});
