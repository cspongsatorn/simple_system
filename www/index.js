let endpoint = 'http://localhost:3000';

$(document).ready(function () {
      $.ajax({
            url: endpoint + '/get_item',
            type:'GET',
            success:function(result){
                  console.log(result)
                  renderTable(result)                         
            },
            error: function(error){
                  console.log(error)
            }
      })
});
const renderTable = (result) => {
      $('#example').DataTable({
            "data": result.data,          
            columns: [
                { "data": 'name' },
                { "data": 'price' },
                { "data": 'quantity' },
                { "data": "_id","width":"100px","render":function(data){
                  return '<button type="button" id="'+ data +'"class="btn btn-info btnsearch" data-toggle="modal" data-target="#myModal" ><i class="fa fa-search"></i></button>'
                }},
                { "data": "_id","width":"100px","render":function(data){
                  return '<button type="button" id="'+ data +'" class="btn btn-warning btnEdit" data-toggle="modal" data-target="#myModal3"><i class="fa fa-edit"></i></button>'
                }}
            ]
      });  
      }

 $(document).on("click",".btnsearch",function(){
            var id = $(this).attr("id")
            console.log("aaa")
            $.ajax({
                  url: endpoint + '/get_item_by_id/'+id,
                  type:'GET',
                  success:function(result){
                        console.log(result)                      
                        $("#text1").text(result.data._id);
                        $("#text2").text(result.data.name);
                        $("#text3").text(result.data.price);
                        $("#text4").text(result.data.quantity);
                        $("#text5").text(result.data.description);
                  },
                  error: function(error){
                        console.log(error)
                  }
            })
      })
      
      $(document).on("click",".btnEdit",function(){
            var id = $(this).attr("id")
            console.log("aaa")
            $.ajax({
                  url: endpoint + '/get_item_by_id/'+id,
                  type:'GET',
                  success:function(result){
                        console.log(result.data._id) 
                        $("#names").val( result.data.name ); 
                        $("#prices").val( result.data.price ); 
                        $("#quantitys").val( result.data.quantity ); 
                        $("#descriptions").val( result.data.description );   
                  },
                  error: function(error){
                        console.log(error)
                  }
            }),
            $("#target2").submit(function(e){
                  e.preventDefault();
                $.ajax({
                  type:"PUT",
                  dataType:"JSON",
                  url: endpoint + '/update_item/'+id,
                  data:{
                        name:$("#names").val(),
                        price:$("#prices").val(),
                        quantity:$("#quantitys").val(),
                        description:$("#descriptions").val(),
                  },success: function(response){
                        console.log("good",response)
                        location.reload();
                  },error: function(err){
                        console.log("bad",err)
                        alert("edit fail!!")
                  }
                })                          
                });
 
      })

      $("#target").submit(function(e){
            e.preventDefault();
          $.ajax({
            type:"POST",
            dataType:"JSON",
            url: endpoint + '/insert_item',
            data:{
                  name:$("#name").val(),
                  price:$("#price").val(),
                  quantity:$("#quantity").val(),
                  description:$("#description").val(),
            },success: function(response){
                  console.log("good",response)
                  location.reload();
            },error: function(err){
                  console.log("bad",err)
                  alert("insert fail!!")
            }
          })                          
          });