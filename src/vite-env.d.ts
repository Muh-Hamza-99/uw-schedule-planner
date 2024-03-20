/// <reference types="vite/client" />
declare module "@daypilot/daypilot-lite-react"
declare module "daypilot-pro-react"

interface ImportMetaEnv {
  readonly VITE_UW_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type Event = {
  id: number;
  text: string;
  start: string;
  end: string;
}

type Schedule = {
  courseId: string;
  courseOfferNumber: number;
  sessionCode: string;
  classSection: number;
  termCode: string;
  classMeetingNumber: number;
  scheduleStartDate: string;
  scheduleEndDate: string;
  classMeetingStartTime: string;
  classMeetingEndTime: string;
  classMeetingDayPatternCode: string;
  classMeetingWeekPatternCode: string;
  locationName: string;
};

type Instructor = {
  courseId: string;
  courseOfferNumber: number;
  sessionCode: string;
  classSection: number;
  termCode: string;
  instructorRoleCode: string;
  instructorFirstName: string;
  instructorLastName: string;
  instructorUniqueIdentifier: string;
  classMeetingNumber: number;
};

type Course = {
  courseId: string;
  courseOfferNumber: number;
  sessionCode: string;
  classSection: number;
  termCode: string;
  classNumber: number;
  courseComponent: string;
  associatedClassCode: number;
  maxEnrollmentCapacity: number;
  enrolledStudents: number;
  enrollConsentCode: string;
  enrollConsentDescription: string;
  dropConsentCode: string;
  dropConsentDescription: string;
  scheduleData: Schedule[];
  instructorData: Instructor[];
};

type SelectedCourse = Course & { subjectCode: string, catalogNumber: string };

type Event = {
  id: number;
  text: string;
  start: string;
  end: string;
}

type Term = {
  associatedAcademicYear: number;
  name: string;
  nameShort: string;
  sixtyPercentCompleteDate: string;
  termBeginDate: string;
  termCode: string;
  termEndDate: string;
}