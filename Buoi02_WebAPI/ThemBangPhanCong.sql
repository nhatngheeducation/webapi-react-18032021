USE [NhatNgheWebAPI]
GO
INSERT [dbo].[VaiTro] ([MaVT], [TenVaiTro]) VALUES (N'VT003', N'Kế toán')
/****** Object:  Table [dbo].[PhanCong]    Script Date: 4/13/2021 6:45:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhanCong](
	[MaKH] [nvarchar](20) NOT NULL,
	[MaVT] [varchar](5) NOT NULL,
 CONSTRAINT [PK_PhanCong] PRIMARY KEY CLUSTERED 
(
	[MaKH] ASC,
	[MaVT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[PhanCong] ([MaKH], [MaVT]) VALUES (N'ANTON', N'VT001')
INSERT [dbo].[PhanCong] ([MaKH], [MaVT]) VALUES (N'ANTON', N'VT002')
INSERT [dbo].[PhanCong] ([MaKH], [MaVT]) VALUES (N'NHATNGHE', N'VT003')
ALTER TABLE [dbo].[PhanCong]  WITH CHECK ADD  CONSTRAINT [FK_PhanCong_KhachHang] FOREIGN KEY([MaKH])
REFERENCES [dbo].[KhachHang] ([MaKH])
GO
ALTER TABLE [dbo].[PhanCong] CHECK CONSTRAINT [FK_PhanCong_KhachHang]
GO
ALTER TABLE [dbo].[PhanCong]  WITH CHECK ADD  CONSTRAINT [FK_PhanCong_VaiTro] FOREIGN KEY([MaVT])
REFERENCES [dbo].[VaiTro] ([MaVT])
GO
ALTER TABLE [dbo].[PhanCong] CHECK CONSTRAINT [FK_PhanCong_VaiTro]
GO
