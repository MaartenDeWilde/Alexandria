using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Alexandria.Models.Web
{
    public class BookAccessResource
    {
        public int Id { get; set; }
        public bool RequestPending { get; set; }
        public bool CopyInPosession { get; set; }
    }
}