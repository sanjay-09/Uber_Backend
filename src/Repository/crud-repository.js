class CrudRepository{

    constructor(model){
        this.model=model;
    }

    async create(data){
        try{
            const res=await this.model.create(data);
            return res;

        }
        catch(err){
            throw err;

        }
    }

    async getById(model_id){
        try{
            const res=await this.model.findById(model_id);
            return res;

        }
        catch(err){
            throw err;
        }
    }
    

}
export default CrudRepository;