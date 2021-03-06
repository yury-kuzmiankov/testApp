/****** Object:  ForeignKey [FK_result_users]    Script Date: 04/01/2015 08:39:25 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_result_users]') AND parent_object_id = OBJECT_ID(N'[dbo].[result]'))
ALTER TABLE [dbo].[result] DROP CONSTRAINT [FK_result_users]
GO
/****** Object:  ForeignKey [FK_users_department]    Script Date: 04/01/2015 08:39:25 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_users_department]') AND parent_object_id = OBJECT_ID(N'[dbo].[users]'))
ALTER TABLE [dbo].[users] DROP CONSTRAINT [FK_users_department]
GO
/****** Object:  ForeignKey [FK_users_role]    Script Date: 04/01/2015 08:39:25 ******/
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_users_role]') AND parent_object_id = OBJECT_ID(N'[dbo].[users]'))
ALTER TABLE [dbo].[users] DROP CONSTRAINT [FK_users_role]
GO
/****** Object:  Table [dbo].[result]    Script Date: 04/01/2015 08:39:25 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[result]') AND type in (N'U'))
DROP TABLE [dbo].[result]
GO
/****** Object:  Table [dbo].[users]    Script Date: 04/01/2015 08:39:25 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
DROP TABLE [dbo].[users]
GO
/****** Object:  Table [dbo].[role]    Script Date: 04/01/2015 08:39:25 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[role]') AND type in (N'U'))
DROP TABLE [dbo].[role]
GO
/****** Object:  Table [dbo].[department]    Script Date: 04/01/2015 08:39:25 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[department]') AND type in (N'U'))
DROP TABLE [dbo].[department]
GO
/****** Object:  Table [dbo].[department]    Script Date: 04/01/2015 08:39:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[department]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[department](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) COLLATE Cyrillic_General_CI_AS NULL,
 CONSTRAINT [PK_department] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON)
)
END
GO
SET IDENTITY_INSERT [dbo].[department] ON
INSERT [dbo].[department] ([id], [name]) VALUES (1, N'Отдел 1')
INSERT [dbo].[department] ([id], [name]) VALUES (2, N'Отдел 0')
INSERT [dbo].[department] ([id], [name]) VALUES (3, N'Отдел 3')
INSERT [dbo].[department] ([id], [name]) VALUES (4, N'Отдел 4')
SET IDENTITY_INSERT [dbo].[department] OFF
/****** Object:  Table [dbo].[role]    Script Date: 04/01/2015 08:39:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[role]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) COLLATE Cyrillic_General_CI_AS NULL,
 CONSTRAINT [PK_role] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON)
)
END
GO
SET IDENTITY_INSERT [dbo].[role] ON
INSERT [dbo].[role] ([id], [name]) VALUES (1, N'admin')
INSERT [dbo].[role] ([id], [name]) VALUES (2, N'user')
INSERT [dbo].[role] ([id], [name]) VALUES (3, N'manager')
SET IDENTITY_INSERT [dbo].[role] OFF
/****** Object:  Table [dbo].[users]    Script Date: 04/01/2015 08:39:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) COLLATE Cyrillic_General_CI_AS NULL,
	[firstName] [varchar](50) COLLATE Cyrillic_General_CI_AS NULL,
	[lastName] [varchar](50) COLLATE Cyrillic_General_CI_AS NULL,
	[password] [varchar](50) COLLATE Cyrillic_General_CI_AS NULL,
	[role] [int] NULL,
	[department] [int] NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON)
)
END
GO
SET IDENTITY_INSERT [dbo].[users] ON
INSERT [dbo].[users] ([id], [name], [firstName], [lastName], [password], [role], [department]) VALUES (1, N'yury', N'Юра', N'Кузьменков', N'123', 1, 1)
INSERT [dbo].[users] ([id], [name], [firstName], [lastName], [password], [role], [department]) VALUES (2, N'tester', N'Юра', N'Сидоров', N'123', 2, 3)
INSERT [dbo].[users] ([id], [name], [firstName], [lastName], [password], [role], [department]) VALUES (3, N'tester', N'Юра', N'Сидоров', N'123', 2, 2)
INSERT [dbo].[users] ([id], [name], [firstName], [lastName], [password], [role], [department]) VALUES (4, N'vasil', N'Антон', N'Иванов', N'123', 3, 2)
INSERT [dbo].[users] ([id], [name], [firstName], [lastName], [password], [role], [department]) VALUES (5, N'ivan', N'Иван', N'Ванин', N'123', 2, 2)
SET IDENTITY_INSERT [dbo].[users] OFF
/****** Object:  Table [dbo].[result]    Script Date: 04/01/2015 08:39:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[result]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[result](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NULL,
	[testId] [int] NULL,
	[fail] [int] NULL,
	[try] [int] NULL,
	[timeSpent] [int] NULL,
	[result] [varchar](50) COLLATE Cyrillic_General_CI_AS NULL,
	[isDone] [int] NULL,
	[timestamp] [datetime] NULL,
	[correct] [int] NULL,
	[neutral] [int] NULL,
 CONSTRAINT [PK_result] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON)
)
END
GO
SET IDENTITY_INSERT [dbo].[result] ON
INSERT [dbo].[result] ([id], [userID], [testId], [fail], [try], [timeSpent], [result], [isDone], [timestamp], [correct], [neutral]) VALUES (1, 5, 20, 0, 1, 9, N'Высокий результат', 1, CAST(0x0000A46C018AF3C5 AS DateTime), 1, 0)
INSERT [dbo].[result] ([id], [userID], [testId], [fail], [try], [timeSpent], [result], [isDone], [timestamp], [correct], [neutral]) VALUES (2, 5, 5, 0, 1, 49, N'Низкий результат', 1, CAST(0x0000A46C018B3096 AS DateTime), 1, 0)
INSERT [dbo].[result] ([id], [userID], [testId], [fail], [try], [timeSpent], [result], [isDone], [timestamp], [correct], [neutral]) VALUES (3, 2, 17, 1, 1, 24, N'Неправильно', 1, CAST(0x0000A46D000299C9 AS DateTime), 0, 0)
INSERT [dbo].[result] ([id], [userID], [testId], [fail], [try], [timeSpent], [result], [isDone], [timestamp], [correct], [neutral]) VALUES (4, 2, 12, 6, 7, 15, N'14% правильных', 1, CAST(0x0000A46D0002B417 AS DateTime), 1, 0)
SET IDENTITY_INSERT [dbo].[result] OFF
/****** Object:  ForeignKey [FK_result_users]    Script Date: 04/01/2015 08:39:25 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_result_users]') AND parent_object_id = OBJECT_ID(N'[dbo].[result]'))
ALTER TABLE [dbo].[result]  WITH CHECK ADD  CONSTRAINT [FK_result_users] FOREIGN KEY([userID])
REFERENCES [dbo].[users] ([id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_result_users]') AND parent_object_id = OBJECT_ID(N'[dbo].[result]'))
ALTER TABLE [dbo].[result] CHECK CONSTRAINT [FK_result_users]
GO
/****** Object:  ForeignKey [FK_users_department]    Script Date: 04/01/2015 08:39:25 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_users_department]') AND parent_object_id = OBJECT_ID(N'[dbo].[users]'))
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_department] FOREIGN KEY([department])
REFERENCES [dbo].[department] ([id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_users_department]') AND parent_object_id = OBJECT_ID(N'[dbo].[users]'))
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_department]
GO
/****** Object:  ForeignKey [FK_users_role]    Script Date: 04/01/2015 08:39:25 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_users_role]') AND parent_object_id = OBJECT_ID(N'[dbo].[users]'))
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_role] FOREIGN KEY([role])
REFERENCES [dbo].[role] ([id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_users_role]') AND parent_object_id = OBJECT_ID(N'[dbo].[users]'))
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_role]
GO
