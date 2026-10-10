import { calculateConversionRate } from './conversionRate.ts';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    throw new Error(`Assertion failed: ${msg}`);
  } else {
    console.log(`✅ PASSED: ${msg}`);
  }
}

console.log('--- Testing Conversion Rate Calculations ---');

// Case 1: Total leads = 0 (No leads state)
const noLeads = calculateConversionRate(0, 0);
assert(noLeads.state === 'no-leads', 'Total 0 gives state no-leads');
assert(noLeads.rate === null, 'Total 0 gives rate null (not 0 or NaN)');
assert(noLeads.formattedRate === '—', 'Total 0 gives formattedRate "—"');
assert(noLeads.headline === 'No data yet', 'Total 0 headline is "No data yet"');
assert(noLeads.showAddAction === true, 'Total 0 shows add first lead CTA');

// Case 2: Total leads > 0, Won leads = 0 (Zero conversions state)
const zeroConv = calculateConversionRate(12, 0);
assert(zeroConv.state === 'zero-conversions', 'Total 12, Won 0 gives zero-conversions state');
assert(zeroConv.rate === 0, 'Total 12, Won 0 gives rate 0');
assert(zeroConv.formattedRate === '0%', 'Total 12, Won 0 gives formattedRate "0%"');
assert(zeroConv.subtext === 'No leads have converted yet.', 'Explains no leads have converted yet');
assert(zeroConv.showAddAction === false, 'Does not show add first lead CTA');

// Case 3: Total leads > 0, Won leads > 0 (Active conversions)
const activeConv = calculateConversionRate(12, 3);
assert(activeConv.state === 'active-conversions', 'Total 12, Won 3 gives active-conversions state');
assert(activeConv.rate === 25, '3 / 12 gives 25%');
assert(activeConv.formattedRate === '25%', 'Formatted rate is "25%"');

// Case 4: Fractional rates
const fractional = calculateConversionRate(3, 1);
assert(fractional.formattedRate === '33.3%', '1 / 3 gives "33.3%"');

// Case 5: Guard against NaN / Infinity / negative inputs
const nanGuarded = calculateConversionRate(NaN as any, 0);
assert(nanGuarded.state === 'no-leads', 'NaN leads safely fallback to no-leads');

const infinityGuarded = calculateConversionRate(Infinity as any, 0);
assert(infinityGuarded.state === 'no-leads', 'Infinity leads safely handled');

console.log('All 7 unit tests passed!');
