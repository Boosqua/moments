users {
   id,
   username,
   password(encrypted),
   stylings( can be null )
}
albums {
   id,
   ownerId,
   styling( maybe ?),
   aws connection,
   public( boolean, 
      if false only people who have it shared can see,
      when set to true maybe add ownerId to PAA table, probably not necessary)
}
privateAlbumAccess( join table to check for private albums) {
   id,
   albumId,
   userId
}
savedAlbums(join table for user to like albums) {
   id,
   userId,
   AlbumId,
}

need methods to 
have user id then
select * from albums 
   left inner join PAA on albums.id = PAA.AlbumId 
   where albums.userId = user.id ?

select * from albums
   left inner join saved albums on savedAlbum.AlbumId = album.id
   where SA.userId = user.id

select * from albums where album.ownerId = user.id

