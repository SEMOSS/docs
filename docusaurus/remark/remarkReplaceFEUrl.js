import { visit } from 'unist-util-visit';

const escapeRegExp = (value) => value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

const ensureGlobalFlags = (flags = 'g') => (flags.includes('g') ? flags : `${flags}g`);

const normalizeDuplicatedProtocol = (value) =>
    value.replaceAll(/\b(https?):\/\/(https?):?\/\//gi, '$1://');

const plugin = (options = {}) => {
    const { replacements = [] } = options;

    const applyReplacements = (value) => {
        let nextValue = value;

        replacements.forEach(({ searchValue, replaceValue, isRegex = false, flags = 'g' }) => {
            if (typeof nextValue !== 'string' || typeof searchValue !== 'string' || replaceValue == null) {
                return;
            }

            const normalizedFlags = ensureGlobalFlags(flags);

            if (isRegex) {
                const pattern = new RegExp(searchValue, normalizedFlags);
                nextValue = nextValue.replaceAll(pattern, replaceValue);
                return;
            }

            const escaped = escapeRegExp(searchValue);
            nextValue = nextValue.replaceAll(new RegExp(escaped, normalizedFlags), replaceValue);
        });

        return normalizeDuplicatedProtocol(nextValue);
    };

    const transformer = async (tree) => {

        visit(tree, 'code', (node) => {
            node.value = applyReplacements(node.value);
        });

        visit(tree, 'text', (node) => {
            node.value = applyReplacements(node.value);
        });

        visit(tree, ['link', 'image'], (node) => {
            if (node.url) {
                node.url = applyReplacements(node.url);
            }
        });

  
    };

    return transformer;
};

export default plugin;