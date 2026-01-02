const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = {id: decoded.userId}; 
    next();
  }catch(err){
     console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  
};
