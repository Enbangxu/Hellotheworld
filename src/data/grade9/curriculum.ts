import type { Subject } from "./types";
import { chineseSubject } from "./subjects/chinese";
import { mathematicsSubject } from "./subjects/mathematics";
import { englishSubject } from "./subjects/english";
import { physicsSubject } from "./subjects/physics";
import { chemistrySubject } from "./subjects/chemistry";
import { moralityLawSubject } from "./subjects/morality-law";
import { historySubject } from "./subjects/history";
export const subjects: Subject[] = [chineseSubject, mathematicsSubject, englishSubject, physicsSubject, chemistrySubject, moralityLawSubject, historySubject];
