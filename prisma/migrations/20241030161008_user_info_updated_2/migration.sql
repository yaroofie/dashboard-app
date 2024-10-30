/*
  Warnings:

  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SocialLinks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WorkExperience` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Education" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "userId" TEXT,
    CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Education" ("degree", "endDate", "fieldOfStudy", "id", "institution", "startDate", "userId") SELECT "degree", "endDate", "fieldOfStudy", "id", "institution", "startDate", "userId" FROM "Education";
DROP TABLE "Education";
ALTER TABLE "new_Education" RENAME TO "Education";
CREATE TABLE "new_Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "proficiencyLevel" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("category", "id", "name", "proficiencyLevel", "userId") SELECT "category", "id", "name", "proficiencyLevel", "userId" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
CREATE TABLE "new_SocialLinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "github" TEXT,
    "linkedin" TEXT,
    "email" TEXT,
    "website" TEXT,
    "userId" TEXT,
    CONSTRAINT "SocialLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SocialLinks" ("email", "github", "id", "linkedin", "userId", "website") SELECT "email", "github", "id", "linkedin", "userId", "website" FROM "SocialLinks";
DROP TABLE "SocialLinks";
ALTER TABLE "new_SocialLinks" RENAME TO "SocialLinks";
CREATE TABLE "new_WorkExperience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "userId" TEXT,
    CONSTRAINT "WorkExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WorkExperience" ("company", "endDate", "id", "position", "startDate", "userId") SELECT "company", "endDate", "id", "position", "startDate", "userId" FROM "WorkExperience";
DROP TABLE "WorkExperience";
ALTER TABLE "new_WorkExperience" RENAME TO "WorkExperience";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
