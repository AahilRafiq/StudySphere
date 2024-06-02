import { serial, text, timestamp, pgTable , pgEnum , varchar } from "drizzle-orm/pg-core";
import countries from '@/constants/countries.json'

/* ENUMS */ 
export const countryEnum = pgEnum("country", ["USA","Australia","India","South"]);
export const roleEnum = pgEnum("role", ["Admin", "Creater", "Member"]);

/* TABLES */ 
export const User = pgTable("User", {
  id: serial("id").primaryKey(),
  username: text("name"),
  email: text("email").unique(),
  password: text("password"),
  country: countryEnum("country"),
});

export const Category = pgTable("Category", {
  category: varchar("category" , {length : 100}).primaryKey(),
})

export const Group = pgTable("Group", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  category: varchar("category" , {length : 100}).references(() => Category.category)
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
  parentId: serial("parentFolderId").references(() => Folder.id),
  groupId: serial("groupId").references(() => Group.id),
});

export const File = pgTable("File", {
  id: serial("id").primaryKey(),
  name: text("name"),
  url: text("url"),
  folderId: serial("folderId").references(() => Folder.id),
  groupId: serial("groupId").references(() => Group.id),
});