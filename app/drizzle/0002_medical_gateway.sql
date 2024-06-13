ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentFolderId_Folder_id_fk";
--> statement-breakpoint
ALTER TABLE "Folder" ALTER COLUMN "groupId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "Folder" ALTER COLUMN "groupId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Folder" ADD COLUMN "parentId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentId_Folder_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."Folder"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Folder" DROP COLUMN IF EXISTS "parentFolderId";