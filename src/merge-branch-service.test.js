import { describe, it, expect } from 'vitest';
import { validateInputs, isLabeledValid } from './merge-branch-service.js';

describe('validateInputs', () => {
  it('throws on invalid type', () => {
    expect(() => validateInputs({ type: 'invalid', targetBranch: 'develop', labelName: null }))
      .toThrow('Invalid type');
  });

  it('throws on empty target branch', () => {
    expect(() => validateInputs({ type: 'now', targetBranch: '', labelName: null }))
      .toThrow('Empty target branch');
  });

  it('throws on missing label name when type is labeled', () => {
    expect(() => validateInputs({ type: 'labeled', targetBranch: 'develop', labelName: '' }))
      .toThrow('Empty target label name');
  });

  it('accepts valid labeled inputs', () => {
    expect(() => validateInputs({ type: 'labeled', targetBranch: 'develop', labelName: 'merge in develop' }))
      .not.toThrow();
  });

  it('accepts valid now inputs without label name', () => {
    expect(() => validateInputs({ type: 'now', targetBranch: 'staging', labelName: '' }))
      .not.toThrow();
  });
});

describe('isLabeledValid', () => {
  it('returns true when action and label match', () => {
    const event = { action: 'labeled', label: { name: 'merge in develop' } };
    expect(isLabeledValid(event, 'merge in develop')).toBe(true);
  });

  it('returns false when label does not match', () => {
    const event = { action: 'labeled', label: { name: 'other label' } };
    expect(isLabeledValid(event, 'merge in develop')).toBe(false);
  });

  it('returns false when action is not labeled', () => {
    const event = { action: 'opened', label: { name: 'merge in develop' } };
    expect(isLabeledValid(event, 'merge in develop')).toBe(false);
  });

  it('handles null event gracefully', () => {
    expect(isLabeledValid(null, 'merge in develop')).toBe(false);
  });
});
