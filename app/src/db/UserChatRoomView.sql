-- create a new view

CREATE VIEW "UserChatRoomView" AS 
SELECT 
    "User"."id" AS "userID", 
    "ChatRoom"."id" AS "chatRoomID"
FROM "ChatRoom"
INNER JOIN "UserGroup" ON "UserGroup"."groupId" = "ChatRoom"."groupId"
INNER JOIN "User" ON "User"."id" = "UserGroup"."userId";