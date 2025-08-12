class CrudService{
    constructor(repo){
        this.repo=repo;

    }

    async create(data){
        try{
            const res=await this.repo.create(data);
            return res;

        }
        catch(err){
            throw err;

        }
    }
    async getById(model_id){
        try{
            const res=await this.repo.getById(model_id);
            return res;

        }
        catch(err){
            throw err;

        }
    }

}
export default CrudService;