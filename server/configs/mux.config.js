import Mux from "@mux/mux-node";
// Create a singleton Mux instance 
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export default mux;