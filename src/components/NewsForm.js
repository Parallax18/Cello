import {useState} from 'react';

const NewsForm = props => {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('')


    const formHandler = (event)=>{
        event.preventDefault();

        props.addNews(title, image, category, summary, author, content);
        setTitle('');
        setImage('');
        setCategory('');
        setSummary('');
        setContent('');
        setAuthor('');
    }

    return (
        <div className = "col-sm-6">

            <div className="spacer" data-height={50} />
            {/* section header */}
            <div className="section-header">
                <h3 className="section-title">What is Happening?</h3>
                <img src="images/wave.svg" className="wave" alt="wave" />
            </div>
       
            <form className="contact-form" onSubmit = {formHandler}>
                <div className="messages" />
                <div className="row">
                    <div className="column col-md-6">
                       
                        <div className="form-group">
                            <input type="text" className="form-control" name="title" value={title} onChange = {(e)=>{setTitle(e.target.value)}} placeholder="Title" required="required" data-error="Name is required." />
                            <div className="help-block with-errors" />
                        </div>
                    </div>
                    <div className="column col-md-6">
                        {/* Email input */}
                        <div className="form-group">
                            <input type="text" className="form-control" name="imageUrl" value={image} onChange = {(e)=>{setImage(e.target.value)}} placeholder="Image URL" required="required" data-error="Email is required." />
                            <div className="help-block with-errors" />
                        </div>
                    </div>
                    <div className="column col-md-12">
                        {/* Email input */}
                        <div className="form-group">
                        <select name="category" id="" className="form-control" value={category} onChange = {(e)=>{setCategory(e.target.value)}} required>
                            <option value="" disabled>Category</option>
                            <option value="lifestyle">LifeStyle</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="business">Business</option>
                            <option value="technology">Technology</option>
                            <option value="politics">Politics</option>
                        </select>
                            <div className="help-block with-errors" />
                        </div>
                    </div>
                    <div className="column col-md-12">
                        {/* Email input */}
                        <div className="form-group">
                            <input type="text" className="form-control"  value={author} onChange = {(e)=>{setAuthor(e.target.value)}} placeholder="Author's Name" required="required" data-error="Email is required." />
                            <div className="help-block with-errors" />
                        </div>
                    </div>
                    <div className="column col-md-12">
                        {/* Message textarea */}
                        <div className="form-group">
                            <textarea name="summary" id="summary" className="form-control" rows={3} value={summary} onChange = {(e)=>{setSummary(e.target.value)}} placeholder="Summary" required="required" data-error="Message is required." defaultValue={""} />
                            <div className="help-block with-errors" />
                        </div>
                    </div>
                    <div className="column col-md-12">
                        {/* Message textarea */}
                        <div className="form-group">
                            <textarea name="newsContent" id="InputMessage" className="form-control" rows={4} value={content} onChange = {(e)=>{setContent(e.target.value)}} placeholder="News Content" required="required" data-error="Message is required." defaultValue={""} />
                            <div className="help-block with-errors" />
                        </div>
                    </div>
                </div>
                <button type="submit" name="submit" id="submit" value="Submit" className="btn btn-default">Add News</button>{/* Send Button */}
            </form>
        </div>
    );
}

export default NewsForm;