-- CreateEnum
CREATE TYPE "EnumProcessingStatus" AS ENUM ('NOT_ACCEPTED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "manager_id" TEXT,
ADD COLUMN     "processingStatus" "EnumProcessingStatus" NOT NULL DEFAULT 'NOT_ACCEPTED';

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
