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
    
    public partial class BookCopy
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string Owner { get; set; }
        public string LendedTo { get; set; }
        public Nullable<System.DateTime> LastTransferDate { get; set; }
    
        public virtual Book Book { get; set; }
    }
}
