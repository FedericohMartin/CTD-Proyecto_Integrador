import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> a = new ArrayList<>();
        a.add("abcd");
        a.add("aaaa");
        a.add("cde");

        System.out.println(solve(a));
    }

    public static int solve(ArrayList<String> A){
        String finalResult = "";
        for (int i = 0; i < A.size(); i++) {
            if (!finalResult.contains(A[i]){
                finalResult += A[i];
            }
        }

        return finalResult.length();
    }
}