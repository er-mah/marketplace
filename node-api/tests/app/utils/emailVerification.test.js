import jwt from "jsonwebtoken";

import { emailVerificationUtils } from "../../../src/utils/emailVerification.js";
import { jwtOpts } from "../../../src/config/index.js";

describe("emailVerificationUtils", () => {
  it("should generate a valid token", async () => {
    const user = { id: "123", email: "test@example.com" };
    const token = await emailVerificationUtils.generateEmailVerificationToken(
      user
    );

    const decoded = jwt.verify(token, jwtOpts.emailSecretOrKey);

    expect(decoded.sub).toBe(user.id);
    expect(decoded.email).toBe(user.email);
  });
});
