DO $$ BEGIN
 CREATE TYPE "public"."country" AS ENUM('USA', 'Australia', 'India', 'South');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('Admin', 'Creater', 'Member');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Category" (
	"category" varchar(100) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ChatRoom" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"groupId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "File" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"url" text,
	"folderId" serial NOT NULL,
	"groupId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Folder" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"parentFolderId" serial NOT NULL,
	"groupId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"category" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GroupTag" (
	"groupId" serial NOT NULL,
	"tagId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Message" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text,
	"userId" serial NOT NULL,
	"chatRoomId" serial NOT NULL,
	"timestamp" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"country" "country",
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserGroup" (
	"userId" serial NOT NULL,
	"groupId" serial NOT NULL,
	"role" "role"
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_groupId_Group_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "File" ADD CONSTRAINT "File_folderId_Folder_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."Folder"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "File" ADD CONSTRAINT "File_groupId_Group_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentFolderId_Folder_id_fk" FOREIGN KEY ("parentFolderId") REFERENCES "public"."Folder"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Folder" ADD CONSTRAINT "Folder_groupId_Group_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Group" ADD CONSTRAINT "Group_category_Category_category_fk" FOREIGN KEY ("category") REFERENCES "public"."Category"("category") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GroupTag" ADD CONSTRAINT "GroupTag_groupId_Group_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GroupTag" ADD CONSTRAINT "GroupTag_tagId_Tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Message" ADD CONSTRAINT "Message_chatRoomId_ChatRoom_id_fk" FOREIGN KEY ("chatRoomId") REFERENCES "public"."ChatRoom"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_groupId_Group_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
