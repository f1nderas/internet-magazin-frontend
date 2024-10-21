/*
  Warnings:

  - The values [IN_PROGRESS,COMPLETED] on the enum `EnumProcessingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumProcessingStatus_new" AS ENUM ('NOT_ACCEPTED', 'ACCEPTED', 'CLOSED');
ALTER TABLE "order" ALTER COLUMN "processingStatus" DROP DEFAULT;
ALTER TABLE "order" ALTER COLUMN "processingStatus" TYPE "EnumProcessingStatus_new" USING ("processingStatus"::text::"EnumProcessingStatus_new");
ALTER TYPE "EnumProcessingStatus" RENAME TO "EnumProcessingStatus_old";
ALTER TYPE "EnumProcessingStatus_new" RENAME TO "EnumProcessingStatus";
DROP TYPE "EnumProcessingStatus_old";
ALTER TABLE "order" ALTER COLUMN "processingStatus" SET DEFAULT 'NOT_ACCEPTED';
COMMIT;
