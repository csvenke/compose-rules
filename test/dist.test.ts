import { testCases } from "./helpers/testCases";
import { runTestCases } from "./helpers/utils";
import { and, or, not } from "../dist";

runTestCases("and", and, testCases);
runTestCases("or", or, testCases);
runTestCases("not", not, testCases);
