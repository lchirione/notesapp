import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageGalery = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%", height: "auto" }} cols={3} rowHeight={180}>
      {images?.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={image}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
