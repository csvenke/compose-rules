import { logic } from "./helpers/testCases";
import { runTestCases } from "./helpers/utils";
import { and, or, not } from "../dist";

runTestCases("and", and, logic);

runTestCases("or", or, logic);

runTestCases("not", not, logic);
