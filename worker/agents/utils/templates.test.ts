import { describe, expect, it } from 'vitest';

import { createScratchTemplateDetails } from './templates';

describe('OnCall scratch template', () => {
	it('includes the protected server-side OnCall capability client', () => {
		const template = createScratchTemplateDetails();
		const sdk = template.allFiles['worker/oncall.ts'];

		expect(sdk).toContain('https://capabilities.oncall.internal');
		expect(sdk).toContain('idempotency-key');
		expect(template.importantFiles).toContain('worker/oncall.ts');
		expect(template.dontTouchFiles).toContain('worker/oncall.ts');
		expect(template.description.usage).toContain('OnCall is authoritative for business data');
	});
});
