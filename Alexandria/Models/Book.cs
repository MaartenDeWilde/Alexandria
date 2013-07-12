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
    
    public partial class Book
    {
        public Book()
        {
            this.BookCopies = new HashSet<BookCopy>();
            this.PendingRequests = new HashSet<PendingRequest>();
            this.Ratings = new HashSet<Rating>();
            this.Tags = new HashSet<Tag>();
        }
    
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public System.DateTime InOrganizationSince { get; set; }
        public int TimesTransfered { get; set; }
        public string ISBN { get; set; }
        public byte[] Image { get; set; }
        public string Author { get; set; }
    
        public virtual ICollection<BookCopy> BookCopies { get; set; }
        public virtual ICollection<PendingRequest> PendingRequests { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }
    }
}