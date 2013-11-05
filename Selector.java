import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


public class Selector {
	
	public static JSONArray remove(final int idx, final JSONArray from) {
	    final List<JSONObject> objs = asList(from);
	    objs.remove(idx);

	    final JSONArray ja = new JSONArray();
	    for (final JSONObject obj : objs) {
	        ja.put(obj);
	    }

	    return ja;
	}

	public static List<JSONObject> asList(final JSONArray ja) {
	    final int len = ja.length();
	    final ArrayList<JSONObject> result = new ArrayList<JSONObject>(len);
	    for (int i = 0; i < len; i++) {
	        final JSONObject obj = ja.optJSONObject(i);
	        if (obj != null) {
	            result.add(obj);
	        }
	    }
	    return result;
	}
	
	public static void main(String[] args) {
		Document doc = null;
		Elements lines = null;
		JSONObject obj = new JSONObject();
		JSONArray arr = new JSONArray();

		
		try { 
			doc = Jsoup.connect("http://www.osym.gov.tr/belge/1-13643/2013-sinav-takvimi.html").get();
			lines = doc.select("td.Content1 table tr");
			for ( Element row: lines ) {
				Elements col = row.select("td");
				if (col.size() == 5) {
				    try {
				    	obj.put("Order", col.get(0).text());
				    	obj.put("Name", col.get(1).text());
				    	obj.put("Date", col.get(2).text());
				    	obj.put("Apply", col.get(3).text());
				 		obj.put("Place", col.get(4).text());
					} catch (JSONException e) {
						e.printStackTrace();
					}
				    arr.put(obj);
				    
				    obj = new JSONObject();
				}
			} 
			
			JSONArray osym = new JSONArray();
			osym = remove(0, arr);
			Writer out = new BufferedWriter(new OutputStreamWriter(
				    new FileOutputStream("/Users/neslihan/Desktop/osym.txt"), "UTF-8"));
				try {
				    out.write(osym.toString());
				} finally {
				    out.close();
				}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
