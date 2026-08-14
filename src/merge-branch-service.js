const TYPE_LABELED = 'labeled';
const TYPE_NOW = 'now';
const VALID_TYPES = [TYPE_LABELED, TYPE_NOW];

function validateInputs({ type, targetBranch, labelName }) {
  if (!VALID_TYPES.includes(type)) {
    throw new Error(`Invalid type: ${type}. Must be one of: ${VALID_TYPES.join(', ')}`);
  }
  if (!targetBranch) {
    throw new Error('Empty target branch');
  }
  if (type === TYPE_LABELED && !labelName) {
    throw new Error('Empty target label name');
  }
}

function isLabeledValid(event, labelName) {
  return event?.action === TYPE_LABELED && event?.label?.name === labelName;
}

module.exports = { validateInputs, isLabeledValid, TYPE_LABELED, TYPE_NOW };
