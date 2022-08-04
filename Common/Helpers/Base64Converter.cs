﻿using System.Text;

#pragma warning disable CS8602 // Dereference of a possibly null reference.

namespace Common.Helpers
{
    public static class Base64Converter
    {
        public static byte[] FromBase64StringSafe(string? base64String)
        {
            string base64WithoutPrefix = string.Empty;

            try
            {
                base64WithoutPrefix = base64String.Split(",")[1];
            }
            catch
            {
                return default!;
            }

            return Convert.FromBase64String(base64WithoutPrefix);
        }



        public static string ToBase64BytesString(byte[]? imageBase64ByteArray)
        {
            var result = new StringBuilder("data:image/png;base64,");

            if (imageBase64ByteArray == null)
            {
                return null!;
            }
            else
            {
                var base64 = Convert.ToBase64String(imageBase64ByteArray);
                result.Append(base64);
                return result.ToString();
            }
        }
    }
}
