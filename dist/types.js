export function isAction(action) {
    return action !== undefined && typeof action === 'object' && 'label' in action;
}
