// @vitest-environment jsdom

import { FrameworkNoticeBanner } from '@/banner/FrameworkNoticeBanner';
import {
    describe,
    it,
    expect,
    beforeEach,
    afterEach,
    vi,
    SpyInstance,
} from 'vitest';
import { render, screen } from '@solidjs/testing-library';
// import {} from '@testing-library/user-event';
describe('FrameworkNoticeBanner', () => {
    let locationSpy: SpyInstance<[Location], void>;
    beforeEach(() => {
        locationSpy = vi.spyOn(window, 'location', 'set');
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('from vanilla to svelte', () => {
        let rendered: ReturnType<typeof render>;
        beforeEach(() => {
            rendered = render(() => (
                <FrameworkNoticeBanner
                    description='desc'
                    currentLabel='Vanilla JS'
                    sourceLinks={{
                        link1: 'http://link1',
                        link2: 'http://link2',
                    }}
                />
            ));
        });
        it('should work', () => {
            expect(rendered.container.innerHTML).toMatchSnapshot();
        });
    });

    describe('from svelte to vanilla', () => {
        let rendered: ReturnType<typeof render>;
        beforeEach(() => {
            rendered = render(() => (
                <FrameworkNoticeBanner
                    description='desc'
                    currentLabel='Astro JS(Solid.js)'
                    sourceLinks={{
                        link1: 'http://link1',
                        link2: 'http://link2',
                    }}
                />
            ));
        });
        it('should work', () => {
            expect(rendered.container.innerHTML).toMatchSnapshot();
        });
    });
});
