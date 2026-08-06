// Entry point for the test suite.
//
// tapzero has no CLI runner: importing a suite registers its tests, and the
// runner flushes them in registration order once this module finishes
// evaluating. The numeric filename prefixes therefore set the run order.
import './0-valid.js';
import './1-size.js';
import './2-perf.js';
import './3-zip.js';
import './4-streams.js';
import './5-async.js';
