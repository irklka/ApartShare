using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ApartShare.Helpers
{
    public class JwtService
    {
        private readonly string secureKey = "Some Very Secury Key";
        public string Generate(Guid id)
        {
            var symmetricSecurityKey = new  SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            // 35 minutes
            var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Now.AddMinutes(35));
            var jwt = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey= new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,

            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
