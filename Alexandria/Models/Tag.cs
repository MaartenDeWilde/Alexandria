//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Alexandria.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Tag
    {
        public Tag()
        {
            this.Books = new HashSet<Book>();
        }
    
        public int Id { get; set; }
        public string TagName { get; set; }
    
        public virtual ICollection<Book> Books { get; set; }
    }
}
