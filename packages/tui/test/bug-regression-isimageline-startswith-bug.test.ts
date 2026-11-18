import assert from "node:assert";
import { describe, it } from "node:test";
import { isImageLine } from "../src/terminal-image.ts";

describe("isImageLine long-line regression", () => {
	it("handles Kitty image lines matching the crash log dimensions", () => {
		const targetWidth = 58649;
		const prefix = "Text";
		const sequence = "\x1b_Ga=T,f=100";
		const suffix = "End";
		const padding = "A".repeat(targetWidth - prefix.length - sequence.length - suffix.length);
		const line = `${prefix}${sequence}${padding}${suffix}`;

		assert.strictEqual(line.length, 58649);
		assert.strictEqual(isImageLine(line), true);
	});

	it("does not detect images in regular long text", () => {
		const longText = "A".repeat(100000);
		assert.strictEqual(isImageLine(longText), false);
	});
});
