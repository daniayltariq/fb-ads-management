<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

    <modal :active="modal" @close="modalClose"></modal>

    <div class="kt-container ">

        <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
          <div class="kt-portlet__head">
            <div class="kt-portlet__head-label">
              <h3 class="kt-portlet__head-title">
                Pricing
              </h3>
            </div>
             <div class="kt-portlet__head-toolbar">
                 <div class="d-flex align-items-center">
                     
                    <button @click="modal = true" class="btn btn-sm btn-label-brand btn-bold">
                        Add new Pricing
                    </button>
                 </div>
             </div>
          </div>
            <div class="kt-portlet__body">
                <loading :active.sync="isLoading" 
                :can-cancel="false" 
           
                :is-full-page="false"></loading>
                <table class="table table-head-bg-brand">
                    <thead class="thead-inverse">
                        <tr>
                            <th>Plan</th>
                            <th>Price</th>
                            <th>Feature</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        <tr  v-for="(ac,i) in pricing.data" key="id">
                           <td>{{ ac.name }}</td>
                           <td>{{ ac.email }}</td>
                           <td>{{ ac.objective }}</td>
                           <td></td>
                        </tr>
 
                    </tbody>
                </table>

                <div class="pagination text-center">
                    <!-- <button  :disabled="!before" @click="previous" type="button" class="btn btn-info mr-2">Previous</button>
                    <button  :disabled="!after" @click="next" type="button" class="btn btn-info">Next</button> -->
                </div>
                
            </div>
            

        </div>

  </div>


             
</div>
</template>

<script>
  import Modal from '@/Admin/views/Pricing/Modal';
  export default{

        components:{
            Modal
        },
    props:{
      currency:{
                type:String,
                 
            },
    },
    name:"AdCampaigns",
    data(){
      return {
                subscritpion:{},
                modal:false,
                pricing:{
                  data:[]
                },
                channel:"",
                acid:"",
                adaccount:"",
                isLoading:false,

                // Paging
                after:"",
                before:"",
             
                // Paging
      }
    },
    
    methods:{
 
            modalClose(val){
                this.modal = val.status;
                if(val.res == 'reload'){
                    this.fetch();
                }
            },

            updateStatus(status,ac){

                  var params = [
                   `channel=${this.channel}`,
                   `acid=${this.acid}`,
                   `adaccount=${this.adaccount}`,
                  ];

                  if(status == 'PAUSED'){
                    status = 'ACTIVE';
                  }else{
                    status = 'PAUSED';
                  }

                  params = params.join('&');
                  axios.post('/api/ad_compaigns/status?'+params,{
                    campaign_id : ac.id,
                    status : status,
                  })
                    .then((response) => {
                       
                    })
                    .catch(function (error) {
                     
                    }).finally( () => {
                      this.isLoading = false;
                    });

              },
           

      fetch(){
                
        this.isLoading = true;
 
        axios.get('/api/admin/pricing')
            .then((response) => {
               this.isLoading = false;
               this.pricing = response.data;
            })
            .catch(function (error) {
             
            }).finally( () => {
                this.isLoading = false;
              });

      }
    },
    created(){
  
       this.fetch();
             
    }
  }

</script>