import {
  Image,
  Text,
  Container,
  ThemeIcon,
  Title,
  SimpleGrid,
  createStyles,
  rem,
  Button,
  
} from "@mantine/core";

import { Link } from "react-router-dom";
import buyGif from '../data/FeaturesGif/buy.gif';
import sellGif from '../data/FeaturesGif/sell.gif';
import tractorGif from '../data/FeaturesGif/tractor.gif';
import dailyCropPrice from "../data/FeaturesGif/dailyCropPrice.svg"


// import Images from "../data/HomeFeaturesImages";
// import { createUseStyles } from "react-jss";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: rem(80),
    paddingBottom: rem(50),
  },

  imageGif: {
    width: "-webkit-fill-available",
    // height: "50%",
    objectFit: "cover",
    borderRadius: theme.radius.md,
    
  },

  item: {
    display: "flex",
  },

  itemIcon: {
    backgroundColor: "transparent !important",
    // display: "flex",
    minWidth: '6rem !important',
    width: '5rem',
    minHeight: '6rem !important',
    height: '5rem',
    // padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
  },

  supTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
    letterSpacing: rem(0.5),
  },

  title: {
    lineHeight: 1,
    textAlign: "center",
    marginTop: theme.spacing.xl,
  },

  description: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: "green",
    }).background,
    padding: rem(5),
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: "inline-block",
    color: theme.colorScheme === "dark" ? theme.white : "inherit",
  },
}));

const HomeFeatures = () => {

  const IMAGES = { dailyCropPrice ,buyGif, sellGif, tractorGif };
  const supTitle = "Features";
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.";
                       

  const data = [
    {
      image: "dailyCropPrice",
      title: "Daily Crop Prices",
      description:
        "Stay updated with daily crop prices in your area. Get real-time market information to make informed decisions about your crop sales, maximize profits, and stay competitive.",
      button: "Check Prices",
      url: "/price",
    },
    {
      image: "sellGif",
      title: "Sell Your Crops",
      description:
        "Effortlessly list and sell your crops to interested buyers. Connect directly with potential buyers, showcase crop details, and ensure fair and transparent transactions.",
      button: "Start Selling",
      url: "/sell_crop",
    },
    {
      image: "buyGif",
      title: "Organic Crop Sellers Near You",
      description:
        "Discover local organic crop sellers following sustainable farming practices. Find high-quality, chemical-free produce and contribute to a healthier food ecosystem.",
      button: "Find Sellers",
      url: "/buy_crop",
    },
    {
      image: "tractorGif",
      title: "Rent or Hire Tractors",
      description:
        "Conveniently rent or hire tractors for your farming needs. Connect with farmers offering tractor rental services to save time, money, and streamline your operations.",
      button: "Explore Tractors",
      url: "/tractor_rental",
    }
];






  const { classes } = useStyles();

  const items = data.map((item) => (
    <div className={classes.item} key={item.image}>
      <ThemeIcon 
        variant="light"
        className={classes.itemIcon}
        size={60}
        radius="md"
      >
        <img src={IMAGES[item.image]} className={classes.imageGif} />
        
        {/* <Image src={IMAGES[item.image]}  /> */}
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text c="dimmed">{item.description}</Text>
        
    
        <Link to={item.url}  style={{display:'flex' , justifyContent:"center" , textDecoration:'none' }}>
          <Button style={{
            marginTop: '1rem',
          }} color="teal" variant="light">{item.button}
        </Button></Link>
    
          
      </div>
    </div>
  ));

  return (
    <Container className={classes.wrapper}>
      

      <Title className={classes.title} >
      Krushi Aadhar for your <span className={classes.highlight}>farming empowerment.</span>
      </Title>

      {/* <Text className={classes.title}>{supTitle}</Text> */}


      {/* <Container size={660} p={0}>
        <Text color="dimmed" className={classes.description}>
          {description}
        </Text>
      </Container> */}

      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: 650, cols: 1, spacing: 40 }]}
        style={{ marginTop: 30 }}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}


export default HomeFeatures;