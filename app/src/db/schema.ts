import { serial, text, timestamp,integer, pgTable , pgView , pgEnum , varchar, AnyPgColumn } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

/* ENUMS */
export const roleEnum = pgEnum("role", ["Admin", "Creater", "Member"]);

/* TABLES */ 
export const User = pgTable("User", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password")
});

export const Category = pgTable("Category", {
  id: serial("id").primaryKey(),
  name: varchar("name" , {length : 100}),
})

export const Group = pgTable("Group", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  categoryId: serial("categoryId").references(() => Category.id)
});

export const UserGroup = pgTable("UserGroup", {
  userId: serial("userId").references(() => User.id),
  groupId: serial("groupId").references(() => Group.id),
  role: roleEnum("role"),
});

export const ChatRoom = pgTable("ChatRoom", {
  id: serial("id").primaryKey(),
  name: text("name"),
  groupId: serial("groupId").references(() => Group.id),
});

export const Message = pgTable("Message", {
  id: serial("id").primaryKey(),
  message: text("message"),
  userID: serial("userId").references(() => User.id),
  roomID: serial("chatRoomId").references(() => ChatRoom.id),
  timestamp: timestamp("timestamp"),
});

export const Tag = pgTable("Tag", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const GroupTag = pgTable("GroupTag", {
  groupId: serial("groupId").references(() => Group.id),
  tagId: serial("tagId").references(() => Tag.id),
});

export const Folder = pgTable("Folder", {
  id: serial("id").primaryKey(),
  name: text("name"),
  parentId: integer("parentId").references(():AnyPgColumn => Folder.id),
  groupId: integer("groupId").references(() => Group.id),
});

export const File = pgTable("File", {
  id: serial("id").primaryKey(),
  name: text("name"),
  url: text("url"),
  folderId: integer("folderId").references(() => Folder.id),
  groupId: integer("groupId").references(() => Group.id),
});

// Refers existing view , refer the view in the db for correct column names
export const UserChatRoomView = pgView("UserChatRoomView",{
  userID: serial("userID"),
  chatRoomID: serial("chatRoomID"),
}).existing()