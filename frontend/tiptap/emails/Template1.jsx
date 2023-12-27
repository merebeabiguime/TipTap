import { Button, Font, Head, Html, Img, Text } from "@react-email/components";
import * as React from "react";

export default function Template1(props) {
  const {details}=props;
  //const details = {amount:25,rating:3.5}
  // Assuming details.rating is a number between 0 and 5 representing the rating
const ratingStars = Array.from({ length: Math.floor(details.rating) }, (_, index) => (
  // Generate JSX for full stars
  <Img src="https://tiptap.biz/api/images/fullstar.png" style={{width:"70px",height:"70px"}} alt="logo"/>
));

if (details.rating % 1 !== 0) {
  // If there is a fractional part, add half star
  ratingStars.push(<Img src="https://tiptap.biz/api/images/halfstar.png" style={{width:"70px",height:"70px"}} alt="logo"/>);
}

const emptyStars = Array.from({ length: Math.floor(5 - details.rating) }, (_, index) => (
  // Generate JSX for empty stars
  <Img src="https://tiptap.biz/api/images/emptystar.png" style={{width:"70px",height:"70px"}} alt="logo"/>
));
  return (
    <Html style={{ backgroundColor: "white", textAlign: "center",marginLeft:"400px",marginRight:"400px" }}>
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z11lFc-K.woff2",
            format: "woff2",
          }}
        />
      </Head>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Img src="https://tiptap.biz/api/images/logo.png" alt="logo" style={{ marginBottom: "115px", width:"200px",height:"73px" }} />
        <Text style={{ color: "#FFBD38", fontSize: "53px", marginBottom: "40px" }}>Félicitations ! </Text>
        <Text style={{ color: "black", fontSize: "24px", marginBottom: "40px" }}>Vous avez reçu un pourboire</Text>
        <div style={{ display: "flex",marginBottom: "40px"}}>
          {ratingStars}
          {emptyStars}
        </div>
        <Text style={{ color: "#062E4B", fontSize: "60px", marginBottom: "40px" }}>{`${details.amount}€`}</Text>
        <Button
          href={process.env.CASHOUT_URL}
          style={{ marginBottom: "60px", color: "white", padding: "10px 20px", backgroundColor: "#595AD4", border: "solid 3px #595AD4", borderRadius: "60px", width: "219px" }}
        >
          Retirer mon argent
        </Button>
        <Text style={{ marginBottom: "60px", color: "black", fontSize: "16px" }}>
Nous sommes ravis de vous informer que vous avez récemment reçu un pourboire via TipTap, une reconnaissance bien méritée de l'un de vos clients.</Text>
        <Text style={{ color: "#777777", fontSize: "15px" }}>“
Je reconnais que l'action de cliquer sur ce bouton me donne accès à mon espace personnel sur Tiptap, et je consens aux conditions générales ainsi qu'à la politique de confidentialité de Tiptap.”</Text>
      </div>
    </Html>
  );
}
