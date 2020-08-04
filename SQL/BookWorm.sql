USE [master]
GO
IF db_id('BookWorm') IS NULL
  CREATE DATABASE [BookWorm]
GO
USE [BookWorm]
GO

DROP TABLE IF EXISTS [SeriesBook];
DROP TABLE IF EXISTS [Series];
DROP TABLE IF EXISTS [Book];
DROP TABLE IF EXISTS [User];
GO

CREATE TABLE [User] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [FirebaseUserId] nvarchar(28) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime  NOT NULL

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Book] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [GoogleId] nvarchar(255) NOT NULL,
  [UserId] integer NOT NULL,
  [ImageLink] nvarchar(255) NOT NULL,
  [Purchased] bit NOT NULL,
  [CompletionPercentage] integer,
  [Rating] integer null,
  [QueuePosition] integer null,
  [StartDate] datetime2 null,
  [EndDate] datetime2 null

  CONSTRAINT FK_Book_User FOREIGN KEY (UserId) REFERENCES [User] ([Id])
)
GO

CREATE TABLE [Series] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [UserId] integer NOT NULL,
  [Name] nvarchar(255) NOT NULL

   CONSTRAINT FK_Series_User FOREIGN KEY (UserId) REFERENCES [User] ([Id])
)
GO

CREATE TABLE [SeriesBook] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [SeriesId] integer NOT NULL,
  [BookId] integer NOT NULL,
  [SeriesPosition] integer null

  CONSTRAINT FK_SeriesBook_Book FOREIGN KEY (BookId) REFERENCES [Book] ([Id])
  ON DELETE CASCADE,

  CONSTRAINT FK_SeriesBook_Series FOREIGN KEY (SeriesId) REFERENCES [Series] ([Id])
  ON DELETE CASCADE
)
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [User]
  ([Id], [FirebaseUserId], [FirstName], [LastName], [Email], [CreateDateTime])
VALUES
  (1, 'OgqVHYage6ctaBtudQakIMGB5SG2', 'Billy', 'Blackman', 'user@user.com', 2020-07-25);
SET IDENTITY_INSERT [User] OFF

SET IDENTITY_INSERT [Book] ON
INSERT INTO [Book]
  ([Id], [GoogleId], [UserId], [ImageLink], [Purchased], [CompletionPercentage], [Rating], [QueuePosition], [StartDate], [EndDate])
VALUES 
  (1, '5NomkK4EV68C', 1, 'http://books.google.com/books/content?id=5NomkK4EV68C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 1, 0, null, null, null, null),
  (2, 'v7eWDwAAQBAJ', 1, 'http://books.google.com/books/content?id=v7eWDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 1, 0, null, null, null, null)