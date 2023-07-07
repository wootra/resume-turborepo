<script lang="ts">
    import { onDestroy } from 'svelte';
    type Groups = { [group: string]: () => void };
    const groups: Groups = {};
    export let classList: string = '';
    export let title: string;
    export let isInitiallyExpanded: boolean = false;
    export let group: string = '';
    export let maxHeight: string = '';
    export let allowCollapseFromBody: boolean = false;
    export let test: () => Element;
    if (isInitiallyExpanded && group && groups[group]) {
        // if group is already loaded, expand just one.
        isInitiallyExpanded = false;
    }
    let isExpanded;
    let isShown;
    let isOverflowHidden;

    $: isExpanded = isInitiallyExpanded || false;
    $: isShown = isInitiallyExpanded || false;

    $: isOverflowHidden = (isExpanded && !isShown) || (!isExpanded && isShown);
    const onClick = () => {
        console.log('onClick', allowCollapseFromBody);
        // if (!allowCollapseFromBody) return;
        const expanded = isExpanded;
        if (expanded) {
            isShown = true;
            isExpanded = !expanded;
        } else {
            isShown = false;
            isExpanded = !expanded;
        }
        if (group) {
            if (groups[group] !== onClick) {
                if (groups[group]) {
                    groups[group]();
                }
                groups[group] = onClick;
            } else {
                delete groups[group];
            }
        }
    };

    $: {
        if (isInitiallyExpanded && group && !groups[group]) {
            groups[group] = onClick;
        }
    }
    onDestroy(() => {
        if (group && groups[group] === onClick) {
            delete groups[group];
        }
    });

    const id = `expand-panel_${Math.random().toString(36).substring(7)}`;
    let panelClassNames = [classList, 'resume-expand-panel', 'gridContainer']
        .filter(v => v)
        .join(' ');
    const onAnimationEnd = () => {
        if (isExpanded) {
            isShown = true;
        } else {
            isShown = false;
        }
    };
</script>

<div
    class={panelClassNames}
    data-expanded={isExpanded}
    {id}
    on:click={onClick}
    on:keyup={onClick}
    role="button"
    tabindex="-1"
>
    <h3 class="title" data-expanded={isExpanded}>
        {title}
    </h3>
    {#if isExpanded || (isShown && !isExpanded)}
        <div
            class="panel"
            data-expanded={isExpanded}
            data-overflow-hidden={maxHeight ? 'auto' : isOverflowHidden}
            on:animationend={onAnimationEnd}
            style={maxHeight ? `max-height:${maxHeight}` : ''}
        >
            <slot>panel content{test?.() || ''}</slot>
        </div>
    {/if}
</div>

<style>
    .resume-expand-panel.gridContainer[data-expanded] {
        display: grid;
        transition: all 0.3s ease-in-out;
    }

    .resume-expand-panel.gridContainer[data-expanded='true'] {
        grid-template-rows: 1.5rem 1fr;
    }

    .resume-expand-panel.gridContainer[data-expanded='false'] {
        grid-template-rows: 1.5rem 0fr;
    }

    .resume-expand-panel > .title {
        grid-row: 1/2;
        cursor: pointer;
    }

    .resume-expand-panel > .panel {
        grid-row: 2/3;
    }

    .resume-expand-panel > .title[data-expanded] {
        color: currentColor;
        position: relative;
        height: 1.5rem;
        width: 100%;
    }

    .resume-expand-panel > .title[data-expanded]::after {
        content: '⬆️';
        position: absolute;
        display: block;
        padding: 0;
        margin: 0;
        font-size: 0.75rem;
        right: 0;
        top: 3px;
        width: 1rem;
        height: 1rem;
        text-align: center;
        transition: all 0.3s ease-in-out;
    }

    .resume-expand-panel > .title[data-expanded='false']::after {
        transform-origin: 50% 50%;
        rotate: 180deg;
    }

    .resume-expand-panel > .title[data-expanded='true']::after {
        transform-origin: 50% 50%;
        rotate: 360deg;
    }

    .resume-expand-panel > .panel[data-expanded] {
        transition: all 1s ease-in-out;
    }

    .resume-expand-panel > .panel[data-overflow-hidden='true'] {
        overflow: hidden;
    }

    .resume-expand-panel > .panel[data-overflow-hidden='false'] {
        overflow: none;
    }

    .resume-expand-panel > .panel[data-overflow-hidden='auto'] {
        overflow: auto;
    }
</style>
