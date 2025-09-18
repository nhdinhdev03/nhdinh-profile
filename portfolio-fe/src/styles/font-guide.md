/**
 * FONT OPTIMIZATION GUIDE - Portfolio Project
 * ==========================================
 * 
 * Font Variables:
 * - $font-primary: Modern system font stack for UI text
 * - $font-mono: Optimized monospace stack for code
 * 
 * Font Mixins Available:
 * 
 * @mixin heading-style($size, $weight)
 * - Use for all headings (h1-h6)
 * - Includes font-family, responsive sizing, proper line-height
 * 
 * @mixin body-text($size, $weight) 
 * - Use for paragraph text, descriptions
 * - Optimized for readability
 * 
 * @mixin button-text($size, $weight)
 * - Use for button labels, CTAs
 * - Includes proper letter-spacing
 * 
 * @mixin label-text($size, $weight)
 * - Use for form labels, small headers
 * - Includes uppercase transform and letter-spacing
 * 
 * @mixin code-text($size, $weight)
 * - Use for code blocks, technical text
 * - Uses monospace font with ligatures
 * 
 * Performance Optimizations Applied:
 * - System font stack (no web font loading)
 * - Font display: swap for better performance
 * - Optimized font rendering properties
 * - Consistent font inheritance
 * 
 * Examples:
 * 
 * // Good ✅
 * .title {
 *   @include heading-style($font-2xl, $font-bold);
 * }
 * 
 * .description {
 *   @include body-text($font-base, $font-normal);
 * }
 * 
 * // Avoid ❌
 * .title {
 *   font-family: "Custom Font", sans-serif;
 *   font-size: 24px;
 * }
 */

/* This file is for documentation only - do not import */